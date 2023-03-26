package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.service.common.MapService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "Map", description = "지도 관련 API")
@RequestMapping("/api/user/map")
@RequiredArgsConstructor
@RestController
public class MapController {

    @Autowired
    private MapService mapService;

    @GetMapping("/list/{lat}/{lng}")
    @Operation(description = "현재 위치에 따른 지도 검사소, 정비소 데이터")
    @Parameters({
            @Parameter(name = "lat", description = "위도"),
            @Parameter(name = "lng", description = "경도")
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,mapService.getMapData(lat,lng));
    }
}
