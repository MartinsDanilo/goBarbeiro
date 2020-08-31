import mongoose from 'mongoose';

const NotificacaoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  usuario: {
    type: Number,
    required: true,
  },
  lido: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Notificacao', NotificacaoSchema);