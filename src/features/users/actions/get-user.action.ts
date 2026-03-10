'use server';

import { userService } from '../services/user.service';
import { UserListItem } from '../types';

export async function getUserAction(id: string): Promise<UserListItem | null> {
    try {
        return await userService.getUserById(id);
    } catch (error) {
        console.error('Error in getUserAction:', error);
        return null;
    }
}
