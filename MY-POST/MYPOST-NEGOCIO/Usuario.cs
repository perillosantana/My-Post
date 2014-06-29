namespace MYPOST_NEGOCIO
{
    public class Usuario
    {
        #region IdUsuario

        private int _idUsuario;

        public int IdUsuario
        {
            get { return _idUsuario; }
            set { _idUsuario = value; }
        }

        #endregion IdUsuario

        #region Nome

        private string _nome = string.Empty;

        public string Nome
        {
            get { return _nome; }
            set { _nome = value; }
        }

        #endregion Nome

        #region Email

        private string _email = string.Empty;

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        #endregion Email

        #region Senha

        private string _senha = string.Empty;

        public string Senha
        {
            get { return _senha; }
            set { _senha = value; }
        }

        #endregion Senha

        #region Imagem

        private string _imagem = string.Empty;

        public string Imagem
        {
            get { return _imagem; }
            set { _imagem = value; }
        }

        #endregion Imagem
    }
}