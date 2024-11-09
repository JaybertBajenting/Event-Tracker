package com.example.demo.Repository;

import com.example.demo.Entity.EventHandlerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventHandlerRepository extends JpaRepository<EventHandlerEntity,Integer> {



}
