package com.homedecor.services;

import com.homedecor.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Role saveRole(Role role);
    List<Role> getAllRoles();
    Optional<Role> getRoleById(Integer id);
    void deleteRole(Integer id);
    Role getRoleByName(String roleName);
}
