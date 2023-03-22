package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.entity.user.InspectBook;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.user.InspectBookGetListMapping;
import site.carborn.mapping.user.InspectResultGetListMapping;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InspectorService {

    @Autowired
    private InspectorRepository inspectorRepository;

    @Autowired
    private InspectBookRepository inspectBookRepository;

    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Transactional
    public Page<InspectBookGetListMapping> inspectBookGetList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String inspector = "imunseymc";
        int inspectorId = inspectorRepository.findByAccount_Id(inspector).getId();

         return inspectBookRepository.findByStatusAndInspector_Id(false,inspectorId,page);
    }

    @Transactional
    public Optional<InspectBook> inspectBookDetail(int id){
        return inspectBookRepository.findById(id);
    }

    @Transactional
    public void inspectorBookUpdate(InspectBook inspectBook){
        inspectBookRepository.save(inspectBook);
    }

    @Transactional
    public void inspectorResultInsert(InspectResult inspectResult){
        inspectResultRepository.save(inspectResult);
    }

    @Transactional
    public Page<InspectResultGetListMapping> inspectResultGetList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String inspector = "imunseymc";
        int inspectorId = inspectorRepository.findByAccount_Id(inspector).getId();

        return inspectResultRepository.findByInspectBook_Inspector_Id(inspectorId,page);
    }

    @Transactional
    public Optional<InspectResult> inspectResultDetail(int id){
        return inspectResultRepository.findById(id);
    }
}
