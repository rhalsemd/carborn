package site.carborn.service.common;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.company.RepairShopRepository;

import java.util.List;
import java.util.Map;

@Service
public class MapService {
    @Autowired
    private RepairShopRepository repairShopRepository;

    @Transactional
    public List<Map<String,String>> getMapData(double lat, double lng){
        return repairShopRepository.getMapData(lat, lng);
    }

}
