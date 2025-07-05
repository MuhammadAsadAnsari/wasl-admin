import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify (response) {
    const id = toast.loading("Please wait...");
    if (response.response.status === 200) {
    setTimeout(function () {
        toast.update(id, { render: response.response.data.message, type: "success", isLoading: false, autoClose: 1000 });
    }, 1500);}
    else if (response.response.status === 400) {
        setTimeout(function () {
            toast.update(id, { render: response.response.data.error, type: "error", isLoading: false, autoClose: 1000 });
        }, 1500);
    }
    else if(response.response.status === 401){
        setTimeout(function () {
            toast.update(id, { render: response.response.data.error, type: "error", isLoading: false, autoClose: 1000 });
        }, 1500);
    }
}

export default notify;