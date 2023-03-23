package site.carborn.service.common;

import com.klaytn.caver.Caver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.tx.Contract;
import xyz.groundx.caver_ext_kas.CaverExtKAS;
import xyz.groundx.caver_ext_kas.rest_client.io.swagger.client.ApiException;

@Service
public class KlaytnService {
    @Value("${klaytn.accessKeyId}")
    public String accessKeyId;

    @Value("${klaytn.secretAccessKey}")
    public String secretAccessKey;

    @Value("${klaytn.authorization}")
    public String authorization;

    @Value("${klaytn.chainId}")
    public String chainId;

    public void contract(String metaDataUri) throws ApiException {
        System.out.println(chainId);
        CaverExtKAS caver = new CaverExtKAS();
        caver.initNodeAPI(chainId, accessKeyId, secretAccessKey);
        caver.initWalletAPI(chainId, accessKeyId, secretAccessKey);
        caver.initTokenHistoryAPI(chainId, accessKeyId, secretAccessKey);
        caver.initAnchorAPI(chainId, accessKeyId, secretAccessKey);
        caver.initKIP37API(chainId, accessKeyId, secretAccessKey);
        //caverExtKAS.kas.kip37.deploy(metaDataUri, "90");
    }
}
