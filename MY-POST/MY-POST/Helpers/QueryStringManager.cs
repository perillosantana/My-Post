namespace MY_POST.Helpers
{
    public class QueryStringManager
    {
        public static string ReturnURL
        {
            get
            {
                return AK.Util.AKRequestQueryString.StringObter("ReturnURL", "");
            }
        }
    }
}