import { LightningElement, track} from 'lwc';
import convertAccount from '@salesforce/apex/LWCParentController.convertAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class LwcParent extends NavigationMixin (LightningElement) {
    @track callapex;
    @track recordId;
    handleAccountSelection(event){
        this.recordId = event.detail;
        console.log("the selected record id is"+event.detail);
        console.log("the selected record id is"+ this.recordId);
    }

    description;

    handleChange(event) {

        console.log( 'Updated Value is ' + event.detail.value );
        this.description = event.detail.value;
        console.log( 'description Value is ' + this.description);

    }

    clickedButtonLabel;

    handleClick(event) {
        convertAccount({recordId: this.recordId, comments: this.description})
        this.showToast();
    }

    showToast() {
        const event = new ShowToastEvent({
            variant: 'success',
            title: 'Success',
            message:
                'Record Updated Successfully!!!.',
        });
        this.dispatchEvent(event);
        this.navigateToObjectHome();
        
        //alert(1);
    }
    navigateToObjectHome() {
        // Navigate to the Account home page
        //alert(2);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            },
        });
        //alert(3);
    }
    
}
