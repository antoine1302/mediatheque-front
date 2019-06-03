import ReferenceForm from "./ReferenceForm";
import MediathequeApi from "../api/mediathequeApi";

class RoleForm extends ReferenceForm {
    _loadReference() {
        const {match} = this.props;

        if (match.params.entityId !== undefined) {
            MediathequeApi.getRole(match.params.entityId).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        currentReference: response.data,
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    _formSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const id = data.get('id');
        const objData = {
            id: data.get('id'),
            title: data.get('title'),
            code: data.get('code'),
            description: data.get('description'),
            enabled: data.get('enabled') !== null,
            weight: data.get('weight')
        };

        if (id !== null) {
            MediathequeApi.updateRole(id, objData).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isSubmit: true
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            MediathequeApi.createRole(objData).then((response) => {
                if (response.status === 200) {
                    this.props.history.push('/roles/' + response.data.id)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    };
}

export default RoleForm;