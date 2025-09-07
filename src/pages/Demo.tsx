import { IonPage } from '@ionic/react';
import { FeedbackForm } from '../components/FeedbackForm/FeedbackForm';
import { FeedbackCard } from '../components/ChatCards/FeedbackCard';

const Demo: React.FC = () => {

    return (
        <IonPage>
            <FeedbackForm onSubmit={async (description, type, images) => {
                console.log(description, type, images);
            }} />

            <FeedbackCard type="bug" description="test 123" images={[]} />
        </IonPage>
    );
};

export default Demo;
