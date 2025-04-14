import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteButton({id }) {
  return (
    <button onClick={onDelete} className="text-red-600 hover:text-red-800">
      <FontAwesomeIcon icon={faTrash} /> Delete
    </button>
  );
}