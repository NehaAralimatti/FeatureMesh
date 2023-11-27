using CSVFileDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVFileDAL;


    public class EntityRepository : IEntityRepository
    {
    private readonly List<EntityTbl> _localEntities;

    public EntityRepository()
    {
        _localEntities = new List<EntityTbl>();
    }

    public async Task AddEntities(IEnumerable<EntityTbl> entities)
    {
        _localEntities.AddRange(entities);
       
    }

    public async Task<List<EntityTbl>> GetAllEntities()
    {
        return _localEntities;
    }
}

