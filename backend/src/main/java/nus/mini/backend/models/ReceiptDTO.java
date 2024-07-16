package nus.mini.backend.models;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nus.mini.backend.models.EnumTypes.CatType;
import nus.mini.backend.models.EnumTypes.PltfmType;
import nus.mini.backend.models.EnumTypes.PmtsType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceiptDTO {

    private int id;

    @NotNull(message = "userId is mandatory")
    private int userId;

    private String fileUrl;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime uploadTime;

    private String payer;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime trxTime;

    @NotNull(message = "total is mandatory")
    @DecimalMin(value = "0.0", inclusive = true, message = "Total cannot be negative")
    private BigDecimal total;

    private CatType category;
    private PltfmType platform;
    private String merchant;
    private String consumer;
    private PmtsType paymentType;

}
