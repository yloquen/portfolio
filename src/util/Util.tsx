export default class Util
{


    public static dotProduct(a1:[], a2:[])
    {
        if (a1.length !== a2.length)
        {
            throw new Error("Dot product error");
        }

        let product = 0;
        for (let i = 0; i < a1.length; i++)
        {
            product += a1[i]*a2[i];
        }

        return product;
    }




}