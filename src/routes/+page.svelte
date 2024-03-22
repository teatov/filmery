<script lang="ts">
  export let data;
  $: allUsers = data.allUsers;
</script>

<table>
  {#each allUsers as user}
    <tr>
      <th>
        {user.id}
      </th>
      <th>{user.firstName}</th>
      <th>{user.lastName}</th>
      <th>{user.age}</th>
      <th>{user.createdAt}</th>
    </tr>
  {/each}
</table>
