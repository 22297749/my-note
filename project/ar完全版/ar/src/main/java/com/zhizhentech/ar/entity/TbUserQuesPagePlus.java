package com.zhizhentech.ar.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author 曹松
 * @since 2018-11-13
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class TbUserQuesPagePlus extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer quesId;

    private Integer userId;

    private String userAccount;

    private String userName;

    private String beginTime;

    private String endTime;

    private String quesName;

    private Double score;

    private String countTime;


}
