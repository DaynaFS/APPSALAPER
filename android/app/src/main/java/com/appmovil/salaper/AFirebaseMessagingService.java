import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.amazonaws.services.pinpoint.PinpointManager;

public class AFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        //token de FCM con Pinpoint
        MainApplication.pinpointManager.getNotificationClient().registerDeviceToken(token);
        //endpoint atributos adic
        PPEndpointManager.registerEndpoint(token);
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        
        MainApplication.pinpointManager.getNotificationClient().handleCampaignPush(remoteMessage.getData());
    }
}
