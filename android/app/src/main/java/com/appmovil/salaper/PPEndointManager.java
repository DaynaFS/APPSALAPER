import com.amazonaws.services.pinpoint.model.EndpointProfile;
import java.util.Arrays;

public class PPEndpointManager {

    public static void registerEndpoint(String token) {
        
        EndpointProfile endpointProfile = MainApplication.pinpointManager.getNotificationClient().getEndpointProfile(); //perfil del endpoint

        
        endpointProfile.setChannelType("GCM");
        endpointProfile.setAddress(token);
        //atributos adicionales
        endpointProfile.getUser().setUserId("USER_ID"); // Identificador único de usuario
        endpointProfile.addAttribute("Preference", Arrays.asList("News", "Sports")); // Preferencias del usuario
        //actualizar endpoint
        MainApplication.pinpointManager.getNotificationClient().updateEndpointProfile(endpointProfile);
    }
}
