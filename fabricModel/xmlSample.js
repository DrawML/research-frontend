/**
 * Created by 구한모 on 2016-08-05.
 */
 function WriteTest()
    {
        try
        {
            var XML=new XMLWriter();
            XML.BeginNode("model");
                XML.Node("type", "linear_regression");
                XML.BeginNode("initializer");
                    XML.BeginNode("weight");
                        XML.Node("type","random_uniform");
                        XML.Node("min","-1.0");
                        XML.Node("max","1.0");
                    XML.EndNode();
                XML.EndNode();
                XML.BeginNode("optimizer");
                    XML.Node("type","gradient_descent");
                    XML.Node("learning_rate","0.01");
                XML.EndNode();
                XML.Node("training_epoch","1024");
            XML.Close(); // Takes care of unended tags.
            // The replace in the following line are only for making the XML look prettier in the textarea.
            console.log(XML.ToString().replace(/</g,"\n<"));
        }
        catch(Err)
        {
            alert("Error: " + Err.description);
        }
        return false;
    }
WriteTest();