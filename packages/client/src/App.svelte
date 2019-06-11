<script>
    import { Router, Route, Link } from 'svelte-routing';
    import Index from './routes/Index.svelte';
</script>

<Router>
    <nav>
        <Link to="/">Index</Link>
    </nav>

    <div>
        <Route path="/" component={Index} />
    </div>
</Router>
