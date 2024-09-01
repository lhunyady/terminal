package com.example.terminal_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ResponseBody
@RequestMapping("v1")
public class TerminalController {

  @Autowired
  GeneratorService generatorService;

  @Autowired
  AuthorizationService authorizationService;

  @CrossOrigin
  @GetMapping("/generate")
  public GenerateResponse generate(
    @RequestParam(defaultValue = "6") Integer number,
    @RequestParam(defaultValue = "0") Integer lower_bound,
    @RequestParam(defaultValue = "49") Integer upper_bound) {
    var generatedNumbers = generatorService.generate(number, lower_bound, upper_bound);

    return new GenerateResponse(generatedNumbers);
  }

  @CrossOrigin
  @PostMapping("/authorize")
  public AuthorizationResponse isAuthorized(@RequestBody TerminalUser user) {
    var isAuthorized = authorizationService.isAuthorized(user);

    return new AuthorizationResponse(isAuthorized);
  }

  @CrossOrigin
  @GetMapping("/users")
  public GetUsersResponse users() {
    var users = authorizationService.users();

    return new GetUsersResponse(users);
  }


}
