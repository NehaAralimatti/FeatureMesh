using CSVFileDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVFileDAL;

public interface IEntityRepository
{
    Task AddEntities(IEnumerable<EntityTbl> entities);
    Task<List<EntityTbl>> GetAllEntities();
}
