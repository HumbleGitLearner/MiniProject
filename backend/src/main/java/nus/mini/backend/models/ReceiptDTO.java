package nus.mini.backend.models;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nus.mini.backend.models.EnumTypes.CatType;
import nus.mini.backend.models.EnumTypes.PltfmType;
import nus.mini.backend.models.EnumTypes.PmtsType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptDTO {

    private int id;

    @NotBlank(message = "userId is mandatory")
    private int userId=0;

    private String fileUrl;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime uploadTime;

    private String payer;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime trxTime;

    @NotBlank(message = "total is mandatory")
    private BigDecimal total;

    private CatType category;
    private PltfmType platform;
    private String merchant;
    private String consumer;
    private PmtsType paymentType;

}
