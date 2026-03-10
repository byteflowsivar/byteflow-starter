'use server';

import { userService } from '../services/user.service';
import { UserListItem } from '../types';

export async function getUsersAction(): Promise<UserListItem[]> {
    try {
        return await userService.getAllUsers();
    } catch (error) {
        console.error('Error in getUsersAction:', error);
        return [];
    }
}
