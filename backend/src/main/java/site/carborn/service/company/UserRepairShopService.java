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
import java.util.Optional;

@Service
public class UserRepairShopService {
    @Autowired
    private RepairBookRepository repairBookRepository;

    public List<RepairBook> repairBookList(String accountId) {
        List<RepairBook> repairBooks = repairBookRepository.findByStatusAndAccount_IdOrderByIdDesc(false, accountId);
//        System.out.println("repairBook는"+repairBook);
        return repairBooks;
    }

    public RepairBook repairBook(Integer id){
        Optional<RepairBook> repairBook = repairBookRepository.findByStatusAndId(false, id);
        return repairBook.get();
    }
}
