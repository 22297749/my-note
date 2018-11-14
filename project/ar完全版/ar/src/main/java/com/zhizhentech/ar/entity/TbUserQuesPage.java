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
public class TbUserQuesPage extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer userId;

    private Integer queId;

    private String quesPage;

    private Double score;

    private Long beginTime;

    private Long endTime;

    private Long countTime;


}
