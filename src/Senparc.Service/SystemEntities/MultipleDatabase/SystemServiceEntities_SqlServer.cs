﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Senparc.Core.Models;
using Senparc.Ncf.Database;
using Senparc.Ncf.Database.MultipleMigrationDbContext;
using Senparc.Ncf.XncfBase;
using Senparc.Ncf.XncfBase.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Senparc.Service
{
    /// <summary>
    /// 设计时 DbContext 创建（仅在开发时创建 Code-First 的数据库 Migration 使用，在生产环境不会执行）
    /// <para>1、切换至 Debug 模式</para>
    /// <para>2、将当前项目设为启动项</para>
    /// <para>3、打开【程序包资源管理器控制台】，默认项目设为当前项目</para>
    /// <para>4、运行：PM> add-migration [更新名称] -Context SystemServiceEntities_SqlServer -o SystemEntities/Migrations/Migrations.SqlServer.SystemEntities</para>
    /// </summary> 
    [MultipleMigrationDbContext(MultipleDatabaseType.SqlServer, typeof(Senparc.Service.Register))]
    public class SystemServiceEntities_SqlServer : SystemServiceEntities
    {
        public SystemServiceEntities_SqlServer(DbContextOptions<SystemServiceEntities_SqlServer> dbContextOptions) : base(dbContextOptions)
        {
        }
    }

    /// <summary>
    /// 设计时 DbContext 创建（仅在开发时创建 Code-First 的数据库 Migration 使用，在生产环境不会执行）
    /// <para>1、切换至 Debug 模式</para>
    /// <para>2、运行：PM> add-migration [更新名称] -C XncfBuilderEntities_SqlServer -o Migrations/Migrations.SqlServer </para>
    /// </summary>
    public class SenparcDbContextFactory_SqlServer : SenparcDesignTimeDbContextFactoryBase<SystemServiceEntities_SqlServer, Register>
    {
        protected override Action<IServiceCollection> ServicesAction => services =>
        {
            //指定其他数据库
            services.AddDatabase("Senparc.Ncf.Database.SqlServer", "Senparc.Ncf.Database.SqlServer", "SQLServerDatabaseConfiguration");
        };

        public SenparcDbContextFactory_SqlServer()
            : base(
                 /* Debug模式下项目根目录
                 /* 用于寻找 App_Data 文件夹，从而找到数据库连接字符串配置信息 */
                 Path.Combine(AppContext.BaseDirectory, "..\\..\\..\\..\\Senparc.Web"))
        {

        }
    }
}