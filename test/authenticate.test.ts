process.env.NODE_ENV = "test";

import { expect } from "chai";
import request from "supertest";
import { startApolloServer } from "../src/app";
import { main, close } from "../src/db";
import {
  mutationDataSuccess,
  mutationDataFail,
  Invalid_Data,
} from "./query_fields";

describe("Testing authenticate mutation.", function () {
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

  it("Success: Returns a token.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .send(mutationDataSuccess)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.equal(undefined);
        expect(JSON.parse(res.text).data.authenticate.token).to.not.be.empty;
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it("Fail: Invalid Credentials.", function (done) {
    request(testServer.url)
      .post(testServer.server.graphqlPath)
      .send(mutationDataFail)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.not.be.empty;
        expect(JSON.parse(res.text).errors[0].extensions.code).to.equal(
          "BAD_USER_INPUT"
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
      .send(Invalid_Data)
      .then(function (res) {
        expect(JSON.parse(res.text).errors).to.not.be.empty;
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
