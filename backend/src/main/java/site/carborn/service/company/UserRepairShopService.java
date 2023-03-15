package site.carborn.service.company;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.user.RepairBook;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.user.RepairBookRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRepairShopService {
    @Autowired
    private RepairBookRepository repairBookRepository;

    public List<RepairBook> repairBookList(String accountId) {
        List<RepairBook> repairBook = repairBookRepository.findByStatusAndAccount_IdOrderByIdDesc(false, accountId);
//        System.out.println("repairBook는"+repairBook);
        return repairBook;
    }

    public RepairBook repairBook(Integer id){
        return repairBookRepository.findById(id).get();
    }
}
