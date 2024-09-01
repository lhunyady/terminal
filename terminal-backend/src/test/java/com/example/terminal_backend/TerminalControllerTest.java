package com.example.terminal_backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;

import static com.example.terminal_backend.AuthorizationService.encryptString;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TerminalControllerTest {
  @LocalServerPort
  private int port;
  @Autowired
  TestRestTemplate restTemplate;

  @Test
  public void generate_test() {
    //ARRANGE
    var url = "http://localhost:%s/v1/generate".formatted(port);
    var responseType = GenerateResponse.class;

    //ACT
    var res = this.restTemplate.getForObject(url, responseType);

    //ASSERT
    assertNotNull(res, "Response is null!");
    assertEquals(6, res.numbers().size(), "Expected 6 results");
  }

  @Test
  public void authorize_test() {
    //ARRANGE
    var testedUser = new TerminalUser("admin@admin.hu", encryptString("admin"));
    var url = "http://localhost:%s/v1/authorize".formatted(port);
    var responseType = AuthorizationResponse.class;

    //ACT
    var res = this.restTemplate.postForObject(url, testedUser, responseType);

    //ASSERT
    assertNotNull(res, "Response is null!");
    assertTrue(res.isAuthorized(),"User %s is not authorized".formatted(testedUser));
  }
}
