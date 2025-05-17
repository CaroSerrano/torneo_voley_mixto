import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface DeleteModalProps {
  open:boolean;
  cancelDelete: () => void;
  confirmDelete: () => void;
  confirmMessage: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  cancelDelete,
  confirmDelete,
  confirmMessage,
}) => {
  return (
    <Dialog open={open} onClose={cancelDelete}>
      <DialogTitle sx={{ bgcolor: '#134755' }}>¿Estás seguro?</DialogTitle>
      <DialogContent sx={{ bgcolor: '#00313e' }}>
        {confirmMessage}
      </DialogContent>
      <DialogActions sx={{ bgcolor: '#00313e' }}>
        <Button onClick={cancelDelete} color='secondary' variant='contained'>
          Cancelar
        </Button>
        <Button onClick={confirmDelete} color='error' variant='contained'>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
