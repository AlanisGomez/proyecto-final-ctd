package com.equipo2.Appkademy.rest.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RestError {

    private String httpCode;
    private String codeMessage;
    private String cause;
    private Validation validation;

    public RestError(String httpCode, String codeMessage, String cause){
        this.httpCode = httpCode;
        this.codeMessage = codeMessage;
        this.cause = cause;
    }

}
