package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.mapping.user.InspectBookGetListMapping;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.util.common.BookUtils;

@Service
@RequiredArgsConstructor
public class InspectorService {

    @Autowired
    private InspectorRepository inspectorRepository;

    @Autowired
    private InspectBookRepository inspectBookRepository;

    @Transactional
    public Page<InspectBookGetListMapping> inspectBookGetList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String inspector = "imunseymc";
        int inspectorId = inspectorRepository.findByAccount_Id(inspector).getId();

         return inspectBookRepository.findByStatusAndInspector_Id(false,inspectorId,page);
    }
}
