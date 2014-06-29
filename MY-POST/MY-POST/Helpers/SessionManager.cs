using System.Web;

namespace MY_POST.Helpers
{
    public class SessionManager
    {
        public static int IdUsuario
        {
            get
            {
                return AK.Util.AKSession.IntObter("IdUsuario", 0);
            }
            set
            {
                if (value == 0)
                {
                    Remover("IdUsuario");
                }
                else
                {
                    HttpContext.Current.Session["IdUsuario"] = value;
                }
            }
        }

        private static void Remover(string pKey)
        {
            HttpContext.Current.Session.Remove(pKey);
        }

        private static string _primeiroNome = "Anônimo";


        public static string PrimeiroNome
        {
            get
            {
                return _primeiroNome;
            }
            set
            {
                _primeiroNome = value;
            }
        }
    }
}