﻿//------------------------------------------------------------------------------
//     This code was generated by a CodeSmith Template.
//
//     DO NOT MODIFY contents of this file. Changes to this
//     file will be lost if the code is regenerated.
//     Author:feng yuan
//------------------------------------------------------------------------------
using Senparc.Ncf.Core.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Senparc.Xncf.CodeBuilder.Models.DatabaseModel.Dto
{
    public class UserBuilderLogDto : DtoBase
    {
        public UserBuilderLogDto() { }

		/// <summary>
       ///是否删除
       /// </summary>
       [Description("是否删除")]
       public bool Flag { get; set; }

       /// <summary>
       ///
       /// </summary>
       [Description("")]
       public DateTime AddTime { get; set; }

       /// <summary>
       ///最后更新时间
       /// </summary>
       [Description("最后更新时间")]
       public DateTime LastUpdateTime { get; set; }

       /// <summary>
       ///
       /// </summary>
       [Description("")]
       public string AdminRemark { get; set; }

       /// <summary>
       ///备注
       /// </summary>
       [Description("备注")]
       public string Remark { get; set; }

       /// <summary>
       ///
       /// </summary>
       [Description("")]
       public string AdditionNote { get; set; }

       /// <summary>
       ///租户Id
       /// </summary>
       [Description("租户Id")]
       public int TenantId { get; set; }

       /// <summary>
       ///用户Id
       /// </summary>
       [Description("用户Id")]
       public string UserId { get; set; }

       /// <summary>
       ///表名
       /// </summary>
       [Description("表名")]
       public string TableName { get; set; }

       /// <summary>
       ///模块名称
       /// </summary>
       [Description("模块名称")]
       public string ModuleName { get; set; }

       /// <summary>
       ///存放路径
       /// </summary>
       [Description("存放路径")]
       public string Path { get; set; }

       /// <summary>
       ///发送次数
       /// </summary>
       [Description("发送次数")]
       public int? Count { get; set; }

       

    }
}
