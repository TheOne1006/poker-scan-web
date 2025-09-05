import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard } from '@ionic/react';
import { FeedbackForm } from '../components/FeedbackForm/FeedbackForm';

const Demo: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Demo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <FeedbackForm />
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default Demo;
