package com.example.terminal_backend;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Set;

@Service
public class AuthorizationService {
  private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();
  Map<String, String> userDb;
  public AuthorizationService (){
    userDb = Map.of("admin@admin.hu", encryptString("admin"));

  }

  public Set<String> users (){
    return userDb.keySet();
  }

  public boolean isAuthorized(TerminalUser user){
    return userDb.get(user.email()).equalsIgnoreCase(user.pass());
  }

  public static String encryptString(String password) {


    final MessageDigest md;
    try {
      md = MessageDigest.getInstance("SHA256");
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
    ByteArrayOutputStream pwsalt = new ByteArrayOutputStream();
    try {
      pwsalt.write(password.getBytes("UTF-8"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    byte[] unhashedBytes = pwsalt.toByteArray();
    byte[] digestVonPassword = md.digest(unhashedBytes);
    return bytesToHex(digestVonPassword);

  }

  public static String bytesToHex(byte[] bytes) {
    char[] hexChars = new char[bytes.length * 2];
    for (int j = 0; j < bytes.length; j++) {
      int v = bytes[j] & 0xFF;
      hexChars[j * 2] = HEX_ARRAY[v >>> 4];
      hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
    }
    return new String(hexChars);
  }
}
