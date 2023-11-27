using CSVFileDAL;
using System.ComponentModel.DataAnnotations;

namespace CSVFileDAL.Models;

public class EntityTbl
{
    [Key]
    public string EntityName { get; set; }
    public string Description{ get; set; }

    public string FeatureName { get; set; }

    public string FeatureDataType { get; set; }
    public string FeatureValue {  get; set; }

    
}


