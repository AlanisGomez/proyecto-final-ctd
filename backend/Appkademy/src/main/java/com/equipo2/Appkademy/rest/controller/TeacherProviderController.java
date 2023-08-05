package com.equipo2.Appkademy.rest.controller;

import com.equipo2.Appkademy.core.mapper.AppkademyMapper;
import com.equipo2.Appkademy.core.model.entity.Teacher;
import com.equipo2.Appkademy.core.service.TeacherService;
import com.equipo2.Appkademy.rest.dto.response.TeacherResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/v1/categories/1/providers/")
public class TeacherProviderController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private AppkademyMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDto> get(@PathVariable Long id){
        Teacher teacher = teacherService.getById(id);
        TeacherResponseDto responseDto = mapper.teacherToTeacherResponseDto(teacher);
        return ResponseEntity.ok(responseDto);
    }

}
