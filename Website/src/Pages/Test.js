import { Button } from '@material-ui/core';
import react,{Component} from 'react';
import firebase,{storage} from './firebase';

export class Test extends Component{
constructor(props){
    super(props);
    this.state={
files:null
    }
}
handleChange=(files)=>{
    this.setState({
        files:files
    })

}
handleSave=()=>{
    let bucketName='images'
    let file=this.state.files[0]
    let storageRef=firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask=storageRef.put(file)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    ()=>{
        let downloadURL=uploadTask.snapshot.downloadURL
    }
    )
}

render(){
    return(
     <div>
         <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}} />
         <Button onClick={this.handleSave}  >Save</Button>
         <img src={'https://firebasestorage.googleapis.com/v0/b/gradproj-bb312.appspot.com/o/images%2F800080.jfif?alt=media&token=d6dd4e0f-c95f-46a3-8d27-6125f6123f5d'} style={{width:'30vw',height:'30vh'}}/>
     </div>

    );
}


}

export default Test;