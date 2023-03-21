package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.service.company.InsuranceService;
import site.carborn.util.network.NormalResponse;

import java.time.LocalDateTime;

@Tag(name = "Insurance History", description = "보험회사 손상 내역 관련 API")
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
@RestController
public class InsuranceController {

    @Autowired
    private InsuranceService insuranceService;

    @PostMapping
    @Operation(description = "보험회사 손상 내역 등록")
    public ResponseEntity<?> insertCarInsuranceHistory(@RequestBody CarInsuranceHistory history){
        history.setRegDt(LocalDateTime.now());
        //multipartfile 들어가야 되는 부분

        //caver 입력 부분

        insuranceService.insertCarInsuranceHistory(history);
        return NormalResponse.toResponseEntity(HttpStatus.OK, "등록 되었습니다.");
    }
}
