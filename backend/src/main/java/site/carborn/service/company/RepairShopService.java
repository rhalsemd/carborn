package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.mapping.user.RepairBookGetListMapping;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.RepairResultRepository;

@Service
@RequiredArgsConstructor
public class RepairShopService {

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private RepairBookRepository repairBookRepository;

    @Autowired
    private RepairResultRepository repairResultRepository;

    @Transactional
    public Page<RepairBookGetListMapping> repairBookList(Pageable page){
        //현재는 임시 아이디(아이디 받아오는 부분 필요)
        String repairShop = "againsburgh28";

        int repairShopId = repairShopRepository.findByAccount_Id(repairShop).getId();
        return repairBookRepository.findByStatusAndRepairShop_Id(false,repairShopId,page);
    }
}
