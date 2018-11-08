package com.zhizhentech.ar.entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author 曹松
 * @since 2018-11-08
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class TbLoginLog extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private Integer userId;

    private String loginTime;


}
