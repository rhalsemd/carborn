package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.repairListMapping;
import site.carborn.repository.user.RepairBookRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserRepairShopService {
    @Autowired
    private RepairBookRepository repairBookRepository;

    public Page<repairListMapping> repairBookList(String accountId, PageRequest pageRequest) {
        Page<repairListMapping> repairBooks = repairBookRepository.findByStatusAndAccount_Id(false, accountId, pageRequest);
        return repairBooks;
    }

    public repairListMapping repairBook(Integer id){
        //게시글이 없을때
        if (repairBookRepository.findById(id).get().isStatus()==true){
            repairListMapping repairBook = null;
            return repairBook;
        }
        repairListMapping repairBook = repairBookRepository.findByStatusAndId(false, id);
        return repairBook;
    }

    @Transactional
    public void createRepairBook(RepairBook repairBook){
        repairBook.setRegDt(LocalDateTime.now());
        repairBook.setUptDt(LocalDateTime.now());
        repairBook.setBookStatus(0);
        repairBook.setStatus(false);
        repairBookRepository.save(repairBook);
    }

    public void deleteRepairBook(Integer id){
        Optional<RepairBook> delete = repairBookRepository.findById(id);
        delete.get().setStatus(true);
        repairBookRepository.save(delete.get());
    }

    public void updateRepairBook(Integer id, RepairBook repairBook) {
        Optional<RepairBook> update = repairBookRepository.findById(id);

        update.get().setCar(repairBook.getCar());
        update.get().setContent(repairBook.getContent());
        update.get().setBookDt(repairBook.getBookDt());
        update.get().setUptDt(LocalDateTime.now());

        repairBookRepository.save(update.get());
    }
}
