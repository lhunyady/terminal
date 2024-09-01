package com.example.terminal_backend;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthorizationService {
  Map<String, byte[]> userDb;
  public AuthorizationService (){
    userDb = Map.of("admin@admin.hu", encryptString("admin"));

  }

  public boolean isAuthorized(TerminalUser user){
    return Arrays.equals(user.pass(), userDb.get(user.email()));
  }

  public static byte[] encryptString(String input) {
    MessageDigest digest = null;
    try {
      digest = MessageDigest.getInstance("SHA-256");
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
    return digest.digest(input.getBytes(StandardCharsets.UTF_8));
  }
}
