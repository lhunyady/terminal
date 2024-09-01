package com.example.terminal_backend;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Service
public class GeneratorService {
  public Set< Integer> generate(Integer count, Integer lowerBound, Integer upperBound){
    HashSet<Integer> res = new HashSet<>();
    Random random = new Random();

    while (res.size()!= count){
      res.add(random.nextInt(lowerBound,upperBound));
    }

    return res;
  }
}
