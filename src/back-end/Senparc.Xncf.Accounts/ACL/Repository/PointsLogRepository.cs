﻿using Senparc.Core.Models;
using Senparc.Xncf.Accounts.Domain.Models;
using Senparc.Ncf.Repository;

namespace Senparc.Service.ACL
{
    public interface IPointsLogRepository : IClientRepositoryBase<PointsLog>
    {
    }

    public class PointsLogRepository : ClientRepositoryBase<PointsLog>, IPointsLogRepository
    {
        public PointsLogRepository(INcfClientDbData NcfClientDbData) : base(NcfClientDbData)
        {

        }
    }
}
