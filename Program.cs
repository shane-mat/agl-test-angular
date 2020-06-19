using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApp3
{
    class Program
    {
        static void Main(string[] args)
        {
            //var array1 = new List<int> { 3, 10, 3, 1, 2, 4, 5,  3, 5, 2, 3};
            //var array2 = new List<int> { 4, 5,  5, 5,  2, 1, 10, 10, 3, 5, 1};

            //var val = CompareArrays(array1, array2);

            string encodedString = "23&[2]24&25&26&23&[3]";

            var output = Frequency(encodedString);

            foreach(var o in output)
            {
                Console.WriteLine(o);
            }
            Console.ReadKey();
        }

        private static int[] Frequency(string encodedString)
        {
            var lookup = new Dictionary<string, char>
            {                     
                {"1",'a'},
                {"2",'b'},
                {"3",'c'},
                {"4",'d'},
                {"5",'e'},
                {"6",'f'},
                {"7",'g'},
                {"8",'h'},
                {"9",'i'},
                {"0#",'j'},
                {"1#",'k'},
                {"2#",'l'},
                {"3#",'m'},
                {"4#",'n'},
                {"5#",'o'},
                {"6#",'p'},
                {"7#",'q'},
                {"8#",'r'},
                {"9#",'s'},
                {"20&",'t'},
                {"21&",'u'},
                {"22&",'v'},
                {"23&",'w'},
                {"24&",'x'},
                {"25&",'y'},
                {"26&",'z'}
            };

            var output = new int[26];

            lookup = lookup.Reverse().ToDictionary(x => x.Key, x => x.Value);

            while(!string.IsNullOrEmpty(encodedString))
            {
                var dict = lookup.FirstOrDefault(key => encodedString.StartsWith(key.Key));
                encodedString = encodedString.Remove(encodedString.IndexOf(dict.Key), dict.Key.Length);

                int count = 1;

                if (encodedString.StartsWith('['))
                {
                    count = Convert.ToInt32(encodedString.Substring(1, encodedString.IndexOf(']')-1));
                    encodedString = encodedString.Remove(encodedString.IndexOf('['), encodedString.IndexOf(']')+1);
                }

                int index = (dict.Value % 32) -1;
                output[index] += count;
            }

            return output;
        }

        private static string CompareArrays(List<int> array1, List<int> array2)
        {
            if(array1 == null || array2 == null || array1.Count != array2.Count)
            {
                return "NO";
            }

            var dict = new Dictionary<int, int>();

            for (int i = 0; i < array1.Count; i++)
            {
                int count = 0;

                if (!dict.TryGetValue(array1[i], out count))
                {
                    dict.Add(array1[i], 1);
                    continue;
                }
                dict[array1[i]] = count + 1;
            }

            var diffDict = new Dictionary<int, int>();
            int diff = 0;

            for (int i = 0; i < array2.Count; i++)
            {
                int count = 0;
                if(!dict.TryGetValue(array2[i], out count))
                {
                    return "NO";
                }

                if (!diffDict.TryGetValue(array2[i], out diff))
                {
                    diff = count - 1;
                    diffDict.Add(array2[i], diff);
                    continue;
                }
               
                if (count > diff)
                {
                    diff--;
                }
                else if (count < diff)
                {
                    diff++;
                }
                else
                {
                    diff = 0;
                }

                diffDict[array2[i]] = Math.Abs(diff);
            }

            if (diffDict.Count != dict.Count || diffDict.Any(r=> r.Value >=3))
            {
                return "NO";
            }

            return "YES";
        }
    }
}
