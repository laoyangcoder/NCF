﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Senparc.Ncf.Database;
using Senparc.Ncf.Core.Models;
using Senparc.Ncf.XncfBase.Database;
using System;
using System.IO;
using Senparc.Xncf.CodeBuilder.Models.DatabaseModel;

namespace Senparc.Xncf.CodeBuilder.Models
{
    [MultipleMigrationDbContext(MultipleDatabaseType.SqlServer, typeof(Register))]
    public class CodeBuilderSenparcEntities_SqlServer : CodeBuilderSenparcEntities
    {
        public CodeBuilderSenparcEntities_SqlServer(DbContextOptions<CodeBuilderSenparcEntities_SqlServer> dbContextOptions) : base(dbContextOptions)
        {
        }
    }
    

    /// <summary>
    /// 设计时 DbContext 创建（仅在开发时创建 Code-First 的数据库 Migration 使用，在生产环境不会执行）
    /// <para>1、切换至 Debug 模式</para>
    /// <para>2、运行：PM> add-migration [更新名称] -c CodeBuilderSenparcEntities_SqlServer -o Migrations/Migrations.SqlServer </para>
    /// </summary>
    public class SenparcDbContextFactory_SqlServer : SenparcDesignTimeDbContextFactoryBase<CodeBuilderSenparcEntities_SqlServer, Register>
    {
        protected override Action<IServiceCollection> ServicesAction => services =>
        {
            //指定其他数据库
            services.AddDatabase("Senparc.Ncf.Database.SqlServer", "Senparc.Ncf.Database.SqlServer", "SQLServerDatabaseConfiguration");
        };

        public SenparcDbContextFactory_SqlServer() : base(SenparcDbContextFactoryConfig.RootDictionaryPath)
        {

        }
    }
}