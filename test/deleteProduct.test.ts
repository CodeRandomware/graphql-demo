process.env.NODE_ENV = "test";

import { expect } from "chai";
import request from "supertest";
import { startApolloServer } from "../src/app";
import { main, close } from "../src/db";
import {
  deleteProductDataSuccess,
  deleteProductDataFail_notFound,
  deleteProductDataFail_cannotDelete,
  Invalid_Data,
  headerSuccess,
  headerFail,
} from "./query_fields";

describe("Testing Delete Product Mutation.", function () {
  let testServer: any;

  before("Connecting to DB and Server", function (done) {
    main()
      .then(async function () {
        testServer = await startApolloServer();

        return done();
      })
      .catch(function (err) {
        return done(err);
      });
  });

  after("Closing DB and Server", function (done) {
    close()
      .then(async function () {
        testServer.server.stop();

        return done();
      })
      .catch(function (err) {
        return done(err);
      });
  });

  it("Success: Returns true when product is deleted.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .set(headerSuccess)
      .send(deleteProductDataSuccess)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.equal(undefined);
        expect(JSON.parse(res.text).data).to.not.be.empty;
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it("Fail: The product is not found.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .set(headerSuccess)
      .send(deleteProductDataFail_notFound)
      .then(function (res) {
        expect(JSON.parse(res.text).errors[0].message).to.equal(
          "Product not found."
        );
        expect(JSON.parse(res.text).errors[0].extensions.code).to.equal(
          "BAD_USER_INPUT"
        );
        expect(JSON.parse(res.text).data).to.be.null;
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it("Fail: The product does not belong to the user.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .set(headerSuccess)
      .send(deleteProductDataFail_cannotDelete)
      .then(function (res) {
        expect(JSON.parse(res.text).errors[0].message).to.equal(
          "Cannot delete product."
        );
        expect(JSON.parse(res.text).errors[0].extensions.code).to.equal(
          "BAD_USER_INPUT"
        );
        expect(JSON.parse(res.text).data).to.be.null;
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it("Fail: Invalid Token.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .set(headerFail)
      .send(deleteProductDataSuccess)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.not.be.empty;
        expect(JSON.parse(res.text).data).to.be.null;
        expect(JSON.parse(res.text).errors[0].extensions.code).to.equal(
          "INVALID_TOKEN"
        );
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it("Fail: Invalid Query.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .set(headerSuccess)
      .send(Invalid_Data)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.not.be.empty;
        expect(JSON.parse(res.text).data).to.equal(undefined);
        expect(JSON.parse(res.text).errors[0].extensions.code).to.equal(
          "GRAPHQL_PARSE_FAILED"
        );
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
